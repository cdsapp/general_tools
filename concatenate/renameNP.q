node: $ROOT

copy_corpus: t

// rename NP* to A-NP if NP* contains an adjective 

query:     ({1}WNP*|NP*|CONJP idoms ADJ*)

replace_label{1}: A-NP
