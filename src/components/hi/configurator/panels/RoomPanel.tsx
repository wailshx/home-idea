import type { RoomType } from "@/lib/configurator-data";
import { useConfigurator } from "@/contexts/ConfiguratorContext";
import OptionCard from "@/components/hi/configurator/OptionCard";
import ColorPicker from "@/components/hi/configurator/ColorPicker";

type RoomPanelProps = {
  roomType: RoomType;
};

const RoomPanel = ({ roomType }: RoomPanelProps) => {
  const { config, setOption } = useConfigurator();
  const room = config.rooms[roomType];

  const categories = room.options.reduce<Record<string, typeof room.options>>((acc, opt) => {
    const cat = opt.category || "Autre";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(opt);
    return acc;
  }, {});

  return (
    <div className="space-y-10">
      {Object.entries(categories).map(([category, options]) => {
        const isColorCategory = options.every((o) => o.color) && options.length <= 8;

        return (
          <div key={category}>
            <div className="text-[10px] tracking-[0.3em] uppercase text-gold mb-4 flex items-center gap-3">
              <span>{category}</span>
              <div className="flex-1 h-px bg-gold/15" />
            </div>

            {isColorCategory ? (
              <ColorPicker
                options={options}
                selected={Object.values(room.selections).find((id) =>
                  options.some((o) => o.id === id)
                ) || ""}
                onSelect={(id) => setOption(roomType, id)}
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {options.map((opt) => (
                  <OptionCard
                    key={opt.id}
                    option={opt}
                    selected={!!room.selections[opt.id]}
                    onSelect={(id) => setOption(roomType, id)}
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default RoomPanel;
