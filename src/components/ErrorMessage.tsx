type ErrorMessageProps = {
  message: string;
};

export default function ErrorMessage({
  message,
}: ErrorMessageProps): JSX.Element {
  return <div>{message}</div>;
}
