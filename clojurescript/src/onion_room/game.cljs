#!/usr/bin/clojure
(ns onion-room.game
  (:require [clojure.spec.alpha :as s]
            )
  )

; For use in GAME object, if I use it
; So apparently these '::' are namespaced keywords,
;  equivalently `onionroom.game/keyword`.
;  They aren't useful until I find a namespace for the engine to keep them in,
;  So I'll stay with namespaceless keywords for now.
(s/def ::player map?)
(s/def ::gold boolean?)

(def GAME
  {
   :player {
            :gold false
            }
   :inventory {
               }
   :nodes {
           :intro intro
           }
   })

; There's two conceptualisations of a node here:
;   The first is a node as what happens in between player choices.
;    It is more a functional route - you pass the player input and game state into the node,
;    and it manipulates the game world, passing information back to the parser.
;   The second is node as location.
;    The node would handle multiple actions that occur within the same space:
;    that is, we expect the previous set of actions to be completable in the same environment.
;   It may be worth to deal with each individually - local state is stored in locations,
;    and action management would be kept in the node object
(s/def ::node
  (s/keys
    req [
         ::events ; the function that defines what goes down
         ::exits ; Actions the player can take which move them to another node
         ]
    opt [
         ::actions ; the commands which the player can take within the room
         ::objects ; The things in the room that the player can obj
         ::items ; Objects the player can pick up into their inventory
         ]
    ))

(defn intro []
  {
   :game GAME
   :output [
            ["Welcome to your cool new adventure!"]
            ]
   }
  )
