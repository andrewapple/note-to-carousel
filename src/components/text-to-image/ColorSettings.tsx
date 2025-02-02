interface ColorSettingsProps {
  selectedTheme: number;
  setSelectedTheme: (theme: number) => void;
  selectedTextColor: string;
  setSelectedTextColor: (color: string) => void;
}

const THEMES = [
  { bg: "bg-theme-1", text: "text-gray-900" },
  { bg: "bg-theme-2", text: "text-gray-900" },
  { bg: "bg-theme-3", text: "text-gray-900" },
  { bg: "bg-theme-4", text: "text-gray-900" },
  { bg: "bg-theme-5", text: "text-gray-900" },
//  { bg: "bg-theme-6", text: "text-gray-900" },
];

const TEXT_COLORS = [
  { name: "Black", value: "#000000" },
  { name: "White", value: "#FFFFFF" },
];

export const ColorSettings = ({
  selectedTheme,
  setSelectedTheme,
  selectedTextColor,
  setSelectedTextColor,
}: ColorSettingsProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Background Color</label>
        <div className="flex gap-2">
          {THEMES.map((theme, index) => (
            <button
              key={index}
              className={`w-8 h-8 rounded-full ${theme.bg} border-2 transition-all ${
                selectedTheme === index
                  ? "border-blue-500 scale-110"
                  : "border-gray-300"
              }`}
              onClick={() => setSelectedTheme(index)}
            />
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Font Color</label>
        <div className="flex gap-2">
          {TEXT_COLORS.map((color, index) => (
            <button
              key={index}
              className={`w-8 h-8 rounded-full border-2 transition-all ${
                selectedTextColor === color.value
                  ? "border-blue-500 scale-110"
                  : "border-gray-300"
              }`}
              style={{ backgroundColor: color.value }}
              onClick={() => setSelectedTextColor(color.value)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
