type ErrorMessageProps = {
  error: string;
};

export function ErrorMessage({ error }: ErrorMessageProps) {
  if (!error) return <></>;

  return (
    <p
      style={{
        color: "#f31",
        margin: "1rem 0",
      }}
    >
      {error}
    </p>
  );
}
