interface containerProps{children:React.ReactNode,className?:string};
export default function Container({children,className}:containerProps) {
    return (
        <div className={`max-w-screen-xl mx-auto px-14 py-10 lg:px-14 ${className}`}>
            {children}
        </div>
    );
}
