import { ChangeEventHandler } from "react";


export type InputType = {
    title: string;
    name: string;
    type: string;
    value: string;
    titlePos?: "left" | "top";
    disabled?: boolean;
    className?: string;
    onChange: ChangeEventHandler;
}


export default function Input(props: InputType): JSX.Element {
    const { titlePos: type = "left"} = props;

    switch (type) {
        case "left":
            return <Left {...props} />;
        case "top":
            return <Top {...props} />;    
    }

    function Left({
        title,
        name,
        type,
        value,
        onChange,
        disabled,
        className
    }: InputType): JSX.Element {
        return (
            <div className='flex bg-gray-500'>
                <label>{title}</label>
                <input 
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                disabled={disabled}
                className={` bg-gray-400 border-2 border-white ${className}`}
                />
            </div>
        )
    }


    function Top({
        title,
        name,
        type,
        value,
        onChange,
        disabled,
        className
    }: InputType): JSX.Element {
        return (
            <div className='flex flex-col bg-gray-500'>
            <label>{title}</label>
            <input 
             name={name}
             type={type}
             value={value}
             onChange={onChange}
             disabled={disabled}
             className={` bg-gray-400 border-2 border-white ${className}`}
            />
        </div>
        )
    } 
}
