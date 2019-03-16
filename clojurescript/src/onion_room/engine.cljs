#!/usr/bin/clojure
(ns onion-room.engine
	)

(defmacro ^:private nskey [macro]
	(keyword *ns* macro))

(defn formatLink
	"Return a link in a platform-appropriate format"
	[url displayText]
	(str "<a href='"url"'>"displayText"</a>"))

(defn say
	[io & lines]
	(let [p (.createElement js/document "p")]
		(doseq [text lines]
			(.appendChild p (.createTextNode js/document text))
			(.appendChild p (.createElement js/document "br"))
			)
		(.appendChild (io :output) p)
		(.scrollIntoView p)
		)
	)

(defn sayParas
	[io & paras]
	(doseq [lines paras]
		(apply say io lines)
		)
	)

(defn updatePara
	[para func]
	(func)
	)

(defn updateLastPara
	[func]
	)

(defn defaultIo []
	(let [io {
			  :input (.getElementById js/document "input")
			  :output (.getElementById js/document "output")}]
		(.focus (io :input))
		io
		)
	)

; TODO: need a way for readCommand to block until a read command can be read!
(defn peekPop
	"Return the first item, and pop that item from the hidden underlying queue"
	[atomicQueue]
	(let [command (swap! atomicQueue peek)]
		(swap! atomicQueue pop)
		command
		))

(defn- makeCommandQueue
	[]
	(let [q (atom #queue [])]
		{
		 :read #(peekPop q)
		 :push #(do (swap! q conj %1))
		 }
		)
	)

; By the way, the commandQueue is a javascript-necessary abstraction.
; It isn't represented in a typical input-output space
(defn parseInput [event io]
	(let [input (io :input)
				queue (io :commandQueue)
				command (.-value input)]
		(when
			(and (= (.-code event) "Enter")
					 (not= "" command))
			(say io
					 (str (io :prompt)" "command))
			(->> ((queue :push) command)
					 (print-str)
					 (.log js/console))
			(set! (.-value input) "")
			)
		command
		)
	)

(defn- makeParseInputEvent
	[io]
	(.addEventListener (io :input) "keyup" #(parseInput %1 io))
)

(defn initialize
	([game] (initialize game (defaultIo)))
	([game io]
	 (let [io (merge io {:commandQueue (makeCommandQueue)})]
		 (.focus (io :input))
		 (apply sayParas io (game))
		 (merge io {:eventListener (makeParseInputEvent io)})
		 )))
