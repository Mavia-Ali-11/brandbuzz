import { ReactNode, memo } from 'react';
import { Link } from 'react-router-dom';
interface ButtonProps {
  type?: "button" | "submit" | "reset" | "link" | undefined;
  variant?: string;
  text: string;
  className?: string;
  icon?: ReactNode;
  iconPosition?: "right" | "left";
  to?: string;
  onClick?: () => void;
}

const PrimaryButton: React.FC<ButtonProps> = ({
  type = undefined,
  text,
  className,
  icon,
  iconPosition = "right",
  to = "/login",
  onClick,
  variant = "primary"
}) => {
  let classes = "w-full p-[10px] rounded duration-300 border-[1px] border-dark_orange ";
  classes += variant === "primary" ? " bg-dark_orange text-white hover:bg-hover_orange hover:border-hover_orange "
    : " bg-white text-dark_orange hover:bg-faded_orange ";
  classes += type === "link" ? " inline-block text-center " : "";
  classes += className;

  return (
    <>
      {
        type === "link" ?
          <Link className={classes} to={to}>
            {iconPosition === "left" && icon}
            {text}
            {iconPosition === "right" && icon}
          </Link>
          :
          <button type={type} className={classes}
            onClick={onClick}
          >
            {iconPosition === "left" && icon}
            {text}
            {iconPosition === "right" && icon}
          </button>
      }
    </>
  )
}

export default memo(PrimaryButton);