import styled from "styled-components";

const Button = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
}) => {
  return (
    <StyledWrapper>
      <button
        type={type}
        className={`button2 ${className}`}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .button2 {
    display: inline-block;
    transition: all 0.2s ease-in;
    position: relative;
    overflow: hidden;
    z-index: 1;

    color: #090909;
    padding: 0.7em 1.7em;
    cursor: pointer;
    font-size: 16px;

    border-radius: 12px;

    background: #e8e8e8;
    border: 1px solid #e8e8e8;

    box-shadow:
      6px 6px 12px #c5c5c5,
      -6px -6px 12px #ffffff;
  }

  .button2:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .button2:active {
    color: #666;
    box-shadow:
      inset 4px 4px 12px #c5c5c5,
      inset -4px -4px 12px #ffffff;
  }

  .button2:before {
    content: "";
    position: absolute;
    left: 50%;
    transform: translateX(-50%) scaleY(1) scaleX(1.25);
    top: 100%;
    width: 140%;
    height: 180%;
    background: rgba(0,0,0,.05);
    border-radius: 50%;
    transition: all .5s .1s cubic-bezier(.55,0,.1,1);
    z-index: -1;
  }

  .button2:after {
    content: "";
    position: absolute;
    left: 55%;
    transform: translateX(-50%) scaleY(1) scaleX(1.45);
    top: 180%;
    width: 160%;
    height: 190%;
    background: #009087;
    border-radius: 50%;
    transition: all .5s .1s cubic-bezier(.55,0,.1,1);
    z-index: -1;
  }

  .button2:hover {
    color: white;
    border-color: #009087;
  }

  .button2:hover:before {
    top: -35%;
    background: #009087;
    transform: translateX(-50%) scaleY(1.3) scaleX(.8);
  }

  .button2:hover:after {
    top: -45%;
    background: #009087;
    transform: translateX(-50%) scaleY(1.3) scaleX(.8);
  }
`;

export default Button;