import ExpoModulesCore
import WebKit
import SVGAPlayer

// This view will be used as a native component. Make sure to inherit from `ExpoView`
// to apply the proper styling (e.g. border radius and shadows).
class ExpoSvgaView: ExpoView {
    lazy var svgaPlayer = SVGAPlayer(frame: .zero)
    lazy var parser = SVGAParser()
    let onFinish = EventDispatcher()
    let onAnimateToFrame = EventDispatcher()
    let onAnimateToPercent = EventDispatcher()
    
    var proxy: SVGAPlayerDelegateProxy?
    
    
    required init(appContext: AppContext? = nil) {
        super.init(appContext: appContext)
        clipsToBounds = true
        addSubview(svgaPlayer)
        proxy = SVGAPlayerDelegateProxy(didFinished: { [weak self] in
            self?.onFinish()
        }, didAnimatedToFrame: { [weak self] frame in
            self?.onAnimateToFrame(["frame": frame])
        }, didAnimatedToPercent: { [weak self] percent in
            self?.onAnimateToPercent(["percent": percent])
        })
        svgaPlayer.delegate = proxy
    }
    
    override func layoutSubviews() {
        svgaPlayer.frame = bounds
    }
    
    func play(uri: URL) {
        parser.parse(with: uri) { [weak self] videoEntity in
            self?.svgaPlayer.videoItem = videoEntity
            self?.svgaPlayer.startAnimation()
        } failureBlock: { error in
            #if DEBUG
            print("DEBUG LOG: \(String(describing: error))")
            #endif
        }
        
        
    }
}

class SVGAPlayerDelegateProxy: NSObject, SVGAPlayerDelegate {
    let didFinished: () -> Void
    let didAnimatedToFrame: (Int) -> Void
    let didAnimatedToPercent: (CGFloat) -> Void
    
    
    init(didFinished: @escaping () -> Void,
         didAnimatedToFrame: @escaping (Int) -> Void,
         didAnimatedToPercent: @escaping (CGFloat) -> Void) {
        self.didFinished = didFinished
        self.didAnimatedToFrame = didAnimatedToFrame
        self.didAnimatedToPercent = didAnimatedToPercent
    }
    
    func svgaPlayerDidFinishedAnimation(_ player: SVGAPlayer!) {
        didFinished();
    }
    
    func svgaPlayer(_ player: SVGAPlayer!, didAnimatedToFrame frame: Int) {
        
    }
    
    func svgaPlayer(_ player: SVGAPlayer!, didAnimatedToPercentage percentage: CGFloat) {
        
    }
}
