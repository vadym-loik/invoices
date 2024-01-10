import './button.scss';

type ButtonProps = {
  className: string;
  type: 'submit' | 'reset' | 'button' | undefined;
  children: React.ReactNode;
};

const Button = ({ className, type, children }: ButtonProps) => {
  return (
    <>
      <button
        className={className}
        type={type}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
