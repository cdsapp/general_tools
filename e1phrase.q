node: $ROOT

copy_corpus: t


query:     (A-NP idoms CODING*)
	AND (CODING* idoms !irrel*)
	AND (A-NP doms {1}*P*)

delete_node{1}: