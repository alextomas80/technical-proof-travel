import "./info-block.scss";

export const InfoBlock = () => {
  return (
    <div data-testid="info-block">
      <h1 className="info-block__title" data-testid="info-block-title">
        Strings Technical Proof
      </h1>
      <p className="info-block__description" data-testid="info-block-description">
        <b>Añade</b> nuevos elementos a la lista, selecciónalos haciendo click sobre ellos, <b>bórralos</b> uno a uno o
        en bloque (o bien, haciendo doble click sobre uno), y <b>restaura</b> el último borrado si te así lo deseas.
      </p>
    </div>
  );
};
