
const NFTViewer = () => {

  // Todo: replace with the actual raffled nft
  return (
    <div className="relative aspect-square">
      <iframe
        src="https://embed.zora.co/0xabEFBc9fD2F806065b4f3C237d4b59D9A97Bcac7/5846?title=false&controls=false&loop=false&autoplay=false" width="100%"
        height="100%"
        scrolling="no"
        allowTransparency
        allowFullScreen
        sandbox="allow-pointer-lock allow-same-origin allow-scripts allow-popups"
        className="aspect-square"
        >
      </iframe>
    </div>
  )
}

export default NFTViewer;