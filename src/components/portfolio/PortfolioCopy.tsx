const ZERO_TO_ONE = "0 → 1";

type PortfolioCopyProps = {
  text: string;
};

export function PortfolioCopy({ text }: PortfolioCopyProps) {
  return (
    <>
      {text.split(ZERO_TO_ONE).map((part, index, parts) => (
        <span key={index}>
          {part}
          {index < parts.length - 1 ? (
            <span className="portfolio__copy-phrase">{ZERO_TO_ONE}</span>
          ) : null}
        </span>
      ))}
    </>
  );
}
