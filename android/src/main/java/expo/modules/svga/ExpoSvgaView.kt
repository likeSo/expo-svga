package expo.modules.svga

import android.content.Context
import android.util.Log
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.Toast
import com.opensource.svgaplayer.SVGACallback
import com.opensource.svgaplayer.SVGAImageView
import com.opensource.svgaplayer.SVGAParser
import com.opensource.svgaplayer.SVGAVideoEntity
import expo.modules.kotlin.AppContext
import expo.modules.kotlin.viewevent.EventDispatcher
import expo.modules.kotlin.views.ExpoView
import java.net.URL

class ExpoSvgaView(context: Context, appContext: AppContext) : ExpoView(context, appContext) {
    // Creates and initializes an event dispatcher for the `onLoad` event.
    // The name of the event is inferred from the value and needs to match the event name defined in the module.
    private val onFinish by EventDispatcher()
    private val onAnimateToFrame by EventDispatcher()
    private val onAnimateToPercent by EventDispatcher()


    internal val svgaPlayer = SVGAImageView(context).apply {
        layoutParams = LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT)
        callback = object : SVGACallback {
            override fun onFinished() {
                onFinish(mapOf());
            }

            override fun onPause() {
            }

            override fun onRepeat() {
            }

            override fun onStep(frame: Int, percentage: Double) {
                onAnimateToPercent(mapOf("percent" to percentage))
            }
        }
    }

    internal val svgaParser = SVGAParser(context)


    init {
        addView(svgaPlayer)
    }

    fun play(uri: URL) {
        svgaParser.decodeFromURL(uri, object : SVGAParser.ParseCompletion {
            override fun onComplete(videoItem: SVGAVideoEntity) {
                svgaPlayer.setVideoItem(videoItem)
                svgaPlayer.startAnimation()
            }

            override fun onError() {
                if (BuildConfig.DEBUG) {
                    Log.e("ExpoSvgaView", "Error decode uri: " + uri)
                    Toast.makeText(context, "解析失败了！" + uri, Toast.LENGTH_LONG).show()
                }
            }
        })
    }
}
