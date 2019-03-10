#!/usr/bin/clojure
(ns onion-room.core
	(:require [clojure.spec.alpha :as s]
			  [onion-room.engine :refer [say]]
			  [onion-room.engine :as eng]
			  )
	)

; For use in GAME object, if I use it
(s/def ::player map?)
(s/def ::gold boolean?)

(def GAME
	{::player {
			   ::gold false
			   }
	 }
	)

(say "Welcome to your cool new adventure!")
