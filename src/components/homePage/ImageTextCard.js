export default function ImageTextCard({ imageUrl, text, backgroundColor }) {
  return (
    <div className="image-text-card" style={{ backgroundColor: backgroundColor }}>
      <div className="card-image-container">
        <img src={imageUrl} alt="Descriptive Image" className="card-image" />
      </div>

    </div>
  );
}

