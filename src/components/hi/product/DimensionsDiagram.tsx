import { Ruler, MoveHorizontal, MoveVertical, ArrowUpDown } from "lucide-react";

type DimensionsDiagramProps = {
  dimensions: string;
  dimensionValues?: { w?: number; h?: number; d?: number; dia?: number; unit: string };
};

const DimensionsDiagram = ({ dimensions, dimensionValues }: DimensionsDiagramProps) => {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 grid place-items-center border border-gold/30">
          <Ruler className="w-5 h-5 text-gold" />
        </div>
        <div>
          <h3 className="font-display text-xl">Dimensions</h3>
          <p className="text-[10px] tracking-[0.2em] uppercase text-gold/60">{dimensions}</p>
        </div>
      </div>

      {dimensionValues ? (
        <div className="relative border border-gold/15 p-8">
          {/* Diagram */}
          <div className="relative mx-auto" style={{ width: "70%", aspectRatio: "4/3" }}>
            {/* Product outline */}
            <div className="absolute inset-0 border border-gold/40 bg-gold/5" />

            {/* Width arrow */}
            {dimensionValues.w && (
              <div className="absolute -bottom-8 left-0 right-0 flex items-center justify-center">
                <div className="w-full flex items-center gap-2">
                  <div className="flex-1 h-px bg-gold/40" />
                  <div className="flex items-center gap-1 text-[11px] text-gold">
                    <MoveHorizontal className="w-3 h-3" />
                    <span className="font-medium">{dimensionValues.w} {dimensionValues.unit}</span>
                  </div>
                  <div className="flex-1 h-px bg-gold/40" />
                </div>
              </div>
            )}

            {/* Height arrow */}
            {dimensionValues.h && (
              <div className="absolute -right-10 top-0 bottom-0 flex items-center justify-center">
                <div className="h-full flex flex-col items-center gap-2">
                  <div className="flex-1 w-px bg-gold/40" />
                  <div className="flex flex-col items-center gap-1 text-[11px] text-gold">
                    <ArrowUpDown className="w-3 h-3" />
                    <span className="font-medium whitespace-nowrap" style={{ writingMode: "vertical-lr" }}>
                      {dimensionValues.h} {dimensionValues.unit}
                    </span>
                  </div>
                  <div className="flex-1 w-px bg-gold/40" />
                </div>
              </div>
            )}

            {/* Depth arrow */}
            {dimensionValues.d && (
              <div className="absolute -top-8 left-0 right-0 flex items-center justify-center">
                <div className="w-full flex items-center gap-2">
                  <div className="flex-1 h-px bg-gold/40" />
                  <div className="flex items-center gap-1 text-[11px] text-gold">
                    <MoveVertical className="w-3 h-3" />
                    <span className="font-medium">{dimensionValues.d} {dimensionValues.unit}</span>
                  </div>
                  <div className="flex-1 h-px bg-gold/40" />
                </div>
              </div>
            )}

            {/* Diameter indicator */}
            {dimensionValues.dia && !dimensionValues.w && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-px bg-gold/40" />
                <div className="absolute flex items-center gap-1 text-[11px] text-gold">
                  <span className="font-medium">Ø {dimensionValues.dia} {dimensionValues.unit}</span>
                </div>
              </div>
            )}
          </div>

          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-gold/60" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-gold/60" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-gold/60" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-gold/60" />
        </div>
      ) : (
        <div className="border border-gold/15 p-6 text-center">
          <p className="text-sm text-muted-foreground">{dimensions}</p>
        </div>
      )}
    </div>
  );
};

export default DimensionsDiagram;
