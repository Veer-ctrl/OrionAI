const UserMessage = ({ message }) => {
  return (
    <div className="flex justify-end py-2">
      <div className="max-w-[88%] sm:max-w-[75%]">
        <div className="rounded-2xl rounded-br-md bg-primary px-4 py-2.5 text-primary-foreground shadow-glow">
          <p className="whitespace-pre-wrap text-sm leading-relaxed">
            {message.content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserMessage;
