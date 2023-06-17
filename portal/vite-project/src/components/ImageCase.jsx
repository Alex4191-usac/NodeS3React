

function ImageCase({ url }) {
  return (
    <>
        <h3>Image Upload succesfull</h3>
        <p>link: {url}</p>
        <div className="image-container">
            <img src={url} alt="uploaded" />
        </div>
    </>
  )
}

export default ImageCase