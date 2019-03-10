#!/usr/bin/clojure
(ns onion-room.engine
	)

(defmacro ^:private nskey [macro]
	(keyword *ns* macro))

(def input (.getElementById js/document "input"))
(def output (.getElementById js/document "output"))
(.focus input)

(defn formatLink
	"Return a link in a platform-appropriate format"
	[url displayText]
	(str "<a href='"url"'>"displayText"</a>"))

(defn say
	[& lines]
	(def p (.createElement js/document "p"))
	(doseq [text lines]
		(.appendChild p (.createTextNode js/document text))
		(.appendChild p (.createElement js/document "br"))
		)
	(.appendChild output p)
	(.scrollIntoView p)
	)

(defn updatePara
	[para func]
	(func)
	)

(defn updateLastPara
	[func]
	)

; This queue is used to store input
;(def ^:private commandQueue (atom #queue []))
(def ^:private commandQueue #queue [])

(defn parseInput [event]
	(when
		(and (= (.-code event) "Enter")
			(not= "" (.-value input)))
		(say
			(str "> " (.-value input)))
		(def commandQueue (conj commandQueue (.-value input)))
		(set! (.-value input) "")
		(.log js/console (print-str commandQueue))
		(.log js/console input)
		)
	)

(.addEventListener input "keyup" parseInput)
