import "./custom-button.scss";

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string | React.ReactNode;
  variant?: "solid" | "outline";
}

export const CustomButton = ({ label, variant = "solid", ...buttonProps }: CustomButtonProps) => {
  return (
    <button className={`custom-button custom-button--${variant}`} {...buttonProps}>
      {label}
    </button>
  );
};
