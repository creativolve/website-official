  import "@/app/css/buttonStars.css";
  import Link from "next/link";
import ShinyText from "../animation/shinnyText";
  

  const GradientButton = ({
    as: Component = "button",
    className = "",
    href,
    color = "white",
    speed = "3s",
    thickness = 3,
    children,
    ...rest
  }) => {
    const content = (
      <div className="inner-content relative overflow-hidden text-white py-[0.3em] px-[1rem] rounded-[20px] z-[1] max-w-[500px] w-full text-center">
        {children}
      </div>
    );

    return (
      <Component
        className={`star-border-container cursor-pointer ${className}`}
        style={{
          padding: `${thickness}px 0`,
          ...rest.style,
        }}
        {...rest}
      >
        <div
          className="border-gradient-bottom"
          style={{
            background: `radial-gradient(circle, ${color}, transparent 10%)`,
            animationDuration: speed,
          }}
        ></div>
        <div
          className="border-gradient-top"
          style={{
            background: `radial-gradient(circle, ${color}, transparent 10%)`,
            animationDuration: speed,
          }}
        ></div>

        {href ? <Link href={href}>{content}</Link> : content}
      </Component>
    );
  };

export function SolidButton({
 as: Component = "button",
    className = "",
    href,
    color = "white",
    speed = "3s",
    thickness = 3,
    children,
    ...rest
}) {

  const content = (
      <div className="relative overflow-hidden text-[#242424] bg-white py-[0.3rem] px-[1rem] rounded-[20px] z-[1] max-w-[200px] w-full text-center hover:bg-[#14161a] hover:text-white ease-in-out duration-200">
        {children}
      </div>
    );


  return (
      <Component
        className={`star-border-container cursor-pointer ${className}`}
        style={{
          padding: `${thickness}px 0`,
          ...rest.style,
        }}
        {...rest}
      >
        <div
          className="border-gradient-bottom"
          style={{
            background: `radial-gradient(circle, ${color}, transparent 10%)`,
            animationDuration: speed,
          }}
        ></div>
        <div
          className="border-gradient-top"
          style={{
            background: `radial-gradient(circle, ${color}, transparent 10%)`,
            animationDuration: speed,
          }}
        ></div>

        {href ? <Link href={href}>{content}</Link> : content}
      </Component>
  );
}


export function ShinyButton({ children }) {
  return (
    <button
      className="relative overflow-hidden text-gray-300 bg-[#14161a] 
                 py-[0.15rem] px-[0.6rem] rounded-md border border-gray-700/50 
                 text-sm w-auto inline-flex items-center justify-center
                 hover:bg-[#1e2024] hover:text-white ease-in-out duration-200"
    >
      <ShinyText text={children} disabled={false} speed={2} />
    </button>
  );
}


  export default GradientButton;
