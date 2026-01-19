import type { TableSlide as TableSlideType } from '@/data/types';

interface TableSlideProps {
  slide: TableSlideType;
}

export function TableSlide({ slide }: TableSlideProps) {
  return (
    <div className="flex flex-col h-full px-8 md:px-16 lg:px-24 py-8 md:py-12 animate-fade-in">
      <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[0.95] uppercase mb-10 md:mb-14">
        {slide.title}
      </h2>

      <div className="flex-1 overflow-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-4 border-foreground">
              {slide.headers.map((header, index) => (
                <th
                  key={index}
                  className="px-6 py-5 text-left text-xl md:text-2xl lg:text-3xl font-black uppercase tracking-wide"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {slide.rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-b-2 border-border"
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={cn(
                      "px-6 py-5 text-xl md:text-2xl lg:text-3xl",
                      cellIndex === 0 ? "font-bold" : "text-muted-foreground"
                    )}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {slide.footnote && (
        <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground mt-8 italic">
          * {slide.footnote}
        </p>
      )}
    </div>
  );
}

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(' ');
}
