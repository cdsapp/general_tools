node: A-NP

copy_corpus: t


query:     (A-NP idoms [4]CODING*)
	AND (CODING* idoms !irrel*)
	AND (CODING* idoms [1]{1}.*)
	AND (A-NP idoms [3].*)
	AND ([3].* idoms [2]{2}.*)
	AND ([3].* haslabel ![5]CODING*)

concat{2, 1}:
