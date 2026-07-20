import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";
import {
  type FullConfig,
  type RoomType,
  type RoomConfig,
  createDefaultConfig,
  calculateRoomCost,
  calculateTotalCost,
} from "@/lib/configurator-data";

type ConfiguratorContextValue = {
  config: FullConfig;
  setActive: (type: RoomType) => void;
  activeRoom: RoomType | null;
  setOption: (roomType: RoomType, optionId: string) => void;
  removeOption: (roomType: RoomType, optionId: string) => void;
  toggleActiveRoom: (type: RoomType) => void;
  getRoomCost: (type: RoomType) => number;
  totalCost: number;
  completedRooms: RoomType[];
  progress: number;
  reset: () => void;
};

const ConfiguratorContext = createContext<ConfiguratorContextValue | undefined>(undefined);

const STORAGE_KEY = "home-idea-config";

export const ConfiguratorProvider = ({ children }: { children: ReactNode }) => {
  const [config, setConfig] = useState<FullConfig>(() => {
    if (typeof window === "undefined") return createDefaultConfig();
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as FullConfig;
        const defaults = createDefaultConfig();
        for (const type of Object.keys(defaults.rooms) as RoomType[]) {
          if (!parsed.rooms[type]) {
            parsed.rooms[type] = defaults.rooms[type];
          }
        }
        return parsed;
      }
    } catch {
      // ignore
    }
    return createDefaultConfig();
  });

  const [activeRoom, setActiveRoom] = useState<RoomType | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  }, [config]);

  const setActive = useCallback((type: RoomType) => {
    setActiveRoom(type);
  }, []);

  const toggleActiveRoom = useCallback((type: RoomType) => {
    setConfig((prev) => {
      const isActive = prev.activeRooms.includes(type);
      const activeRooms = isActive
        ? prev.activeRooms.filter((r) => r !== type)
        : [...prev.activeRooms, type];
      return { ...prev, activeRooms };
    });
  }, []);

  const setOption = useCallback((roomType: RoomType, optionId: string) => {
    setConfig((prev) => {
      const room = prev.rooms[roomType];
      const option = room.options.find((o) => o.id === optionId);
      if (!option) return prev;

      const category = option.category;
      const newSelections = { ...room.selections };

      if (category) {
        for (const [key] of Object.entries(newSelections)) {
          const existingOpt = room.options.find((o) => o.id === key);
          if (existingOpt?.category === category && key !== optionId) {
            delete newSelections[key];
          }
        }
      }

      if (newSelections[optionId]) {
        delete newSelections[optionId];
      } else {
        newSelections[optionId] = optionId;
      }

      return {
        ...prev,
        rooms: {
          ...prev.rooms,
          [roomType]: { ...room, selections: newSelections },
        },
      };
    });
  }, []);

  const removeOption = useCallback((roomType: RoomType, optionId: string) => {
    setConfig((prev) => {
      const room = prev.rooms[roomType];
      const newSelections = { ...room.selections };
      delete newSelections[optionId];
      return {
        ...prev,
        rooms: {
          ...prev.rooms,
          [roomType]: { ...room, selections: newSelections },
        },
      };
    });
  }, []);

  const getRoomCost = useCallback(
    (type: RoomType) => calculateRoomCost(config.rooms[type]),
    [config]
  );

  const totalCost = calculateTotalCost(config);

  const completedRooms = config.activeRooms.filter(
    (type) => Object.keys(config.rooms[type].selections).length > 0
  );

  const progress = Math.round(
    (completedRooms.length / Math.max(config.activeRooms.length, 1)) * 100
  );

  const reset = useCallback(() => {
    setConfig(createDefaultConfig());
    setActiveRoom(null);
  }, []);

  return (
    <ConfiguratorContext.Provider
      value={{
        config,
        setActive,
        activeRoom,
        setOption,
        removeOption,
        toggleActiveRoom,
        getRoomCost,
        totalCost,
        completedRooms,
        progress,
        reset,
      }}
    >
      {children}
    </ConfiguratorContext.Provider>
  );
};

export const useConfigurator = () => {
  const ctx = useContext(ConfiguratorContext);
  if (!ctx) throw new Error("useConfigurator must be used within ConfiguratorProvider");
  return ctx;
};
