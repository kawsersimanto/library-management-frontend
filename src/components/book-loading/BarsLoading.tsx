import "./BarsLoading.css";

interface BarsLoadingProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  color?: "blue" | "red" | "green" | "purple" | "orange";
}

const BarsLoading = ({
  size = "md",
  className = "",
  color = "blue",
}: BarsLoadingProps) => {
  return (
    <div className={`bars-container ${className}`}>
      <div className={`bar bar-${size} bar-${color} bar-1`} />
      <div className={`bar bar-${size} bar-${color} bar-2`} />
      <div className={`bar bar-${size} bar-${color} bar-3`} />
      <div className={`bar bar-${size} bar-${color} bar-4`} />
    </div>
  );
};

export default BarsLoading;
