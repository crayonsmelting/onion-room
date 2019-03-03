#!/usr/bin/clojure
(ns onion-room.core
	(:require [clojure.spec.alpha :as s])
	)

; For use in GAME object, if I use it
(s/def ::player map?)
(s/def ::gold boolean?)

(def GAME
	{::player {
			   gold false
			   }
	 }
	)

(def input (.getElementById js/document "input"))
(def output (.getElementById js/document "output"))

(defn say [text]
	(.insertAdjacentHTML output "beforeend" text)
)

(say "Welcome to your cool new adventure!")
(println "Welcome to your cool new adventure!")
