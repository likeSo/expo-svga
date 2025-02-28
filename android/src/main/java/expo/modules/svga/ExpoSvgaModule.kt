package expo.modules.svga

import android.os.Bundle
import android.widget.Toast
import com.opensource.svgaplayer.SVGAImageView
import com.opensource.svgaplayer.utils.log.SVGALogger
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import java.net.URL

class ExpoSvgaModule : Module() {
    // Each module class must implement the definition function. The definition consists of components
    // that describes the module's functionality and behavior.
    // See https://docs.expo.dev/modules/module-api for more details about available components.
    override fun definition() = ModuleDefinition {
        // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
        // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
        // The module will be accessible from `requireNativeModule('ExpoSvga')` in JavaScript.
        Name("ExpoSvga")

        // Sets constant properties on the module. Can take a dictionary or a closure that returns a dictionary.
        Constants(
            "PI" to Math.PI
        )

        // Defines event names that the module can send to JavaScript.
        Events("onChange")

        Function("setLogEnabled") { enabled: Boolean ->
            SVGALogger.setLogEnabled(enabled)
        }

        Function("loggerEnabled") {
            SVGALogger.isLogEnabled()
        }

        // Defines a JavaScript function that always returns a Promise and whose native code
        // is by default dispatched on the different thread than the JavaScript runtime runs on.
        AsyncFunction("setValueAsync") { value: String ->
            // Send an event to JavaScript.
            sendEvent(
                "onChange", mapOf(
                    "value" to value
                )
            )
        }

        // Enables the module to be used as a native view. Definition components that are accepted as part of
        // the view definition: Prop, Events.
        View(ExpoSvgaView::class) {
            Prop("source") { view: ExpoSvgaView, source: SvgaViewSource ->
                if (source.uri != null) {
                    view.play(source.uri)
                }
            }

            Prop("loops") { view: ExpoSvgaView, loops: Boolean ->
                view.svgaPlayer.loops = if (loops) 1 else 0
            }

            Prop("clearsAfterStop") { view: ExpoSvgaView, clearsAfterStop: Boolean ->
                view.svgaPlayer.clearsAfterStop = clearsAfterStop
            }

            Prop("fillMode") { view: ExpoSvgaView, fillMode: String ->
                val fillModeEnum: SVGAImageView.FillMode = when(fillMode) {
                    "backward" -> SVGAImageView.FillMode.Backward
                    "forward" -> SVGAImageView.FillMode.Forward
                    "clear" -> SVGAImageView.FillMode.Clear
                    else -> SVGAImageView.FillMode.Forward
                }
                view.svgaPlayer.fillMode = fillModeEnum
            }


            AsyncFunction("startAnimation") { view: ExpoSvgaView ->
                view.svgaPlayer.startAnimation()
            }

            AsyncFunction("stopAnimation") { view: ExpoSvgaView ->
                view.svgaPlayer.stopAnimation()
            }

            // Defines an event that the view can send to JavaScript.
            Events("onFinish", "onAnimateToFrame", "onAnimateToPercent")
        }
    }
}
