export type NavButtonType = {
    text: string;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    active?: boolean;
  };
  
  export default function NavButton(props : NavButtonType): JSX.Element {
    const {active: type = false} = props; 


    switch (type) {
        case true:
            return <Active {...props} />
        case false:
            return <NotActive {...props} />    
    }


    function Active({
        text,
        onClick,
        disabled,
        className,
    }: NavButtonType): JSX.Element {
        return (
            <button
              className={` disabled:bg-red-500 border-2 px-5 py-6 text-lg border-white  bg-green-400  ${className}`}
              onClick={onClick}
              disabled={disabled}
            >
              {text}
            </button>
          );
    }


    function NotActive({
        text,
        onClick,
        disabled,
        className,
    }: NavButtonType): JSX.Element {
        return (
            <button
              className={` disabled:bg-red-500 border-2 px-5 py-6 text-lg border-white bg-black text-white ${className}`}
              onClick={onClick}
              disabled={disabled}
            >
              {text}
            </button>
          );
    }

   
  }
  