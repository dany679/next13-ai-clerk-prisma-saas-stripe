interface HeadingTextProps {
  title: string;
  description: string;
}

const HeadingText = ({ title, description }: HeadingTextProps) => {
  return (
    <div className="">
      <h2 className="text-3xl font-bold">{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

export default HeadingText;
