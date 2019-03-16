#!/usr/bin/clojure
(ns onion-room.game
	(:require [clojure.spec.alpha :as s]
			  )
	)

; For use in GAME object, if I use it
(s/def ::player map?)
(s/def ::gold boolean?)

(def GAME
	{
	 ::player
	 {
	  ::gold false
	  }}
	)

(defn intro []
	[
	 ["Welcome to your cool new adventure!"]
	 ]
	)
