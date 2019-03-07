#!/usr/bin/clojure
(ns onion-room.engine
	)

(def input (.getElementById js/document "input"))
(def output (.getElementById js/document "output"))

(defn say
	[& lines]
	(def p (.createElement js/document "p"))
		(doseq [text lines]
			(.appendChild p (.createTextNode js/document text))
			(.appendChild p (.createElement js/document "br"))
			)
	(.appendChild output p)
	)
