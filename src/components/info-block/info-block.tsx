import "./info-block.scss";

export const InfoBlock = () => {
  return (
    <div data-testid="info-block">
      <h1 className="info-block__title" data-testid="info-block-title">
        This is a technical proof
      </h1>
      <p className="info-block__description" data-testid="info-block-description">
        Lorem ipsum dolor sit amet consectetur adipiscing, elit mus primis nec inceptos. Lacinia habitasse arcu molestie
        maecenas cursus quam nunc, hendrerit posuere augue fames dictumst placerat porttitor, dis mi pharetra vestibulum
        venenatis phasellus.
      </p>
    </div>
  );
};
