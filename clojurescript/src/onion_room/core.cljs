#!/usr/bin/clojure
(ns onion-room.core
	(:require [clojure.spec.alpha :as s]
			  [onion-room.engine :as eng]
			  [onion-room.game :as game]
			  )
	)

(def io (eng/initialize game/intro))
