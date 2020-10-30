/* PseudoCode:
1) all pages (except high score page)
    a) View High Scores
    b) Timer
    header containing high score link and timer (hide on highscore page)

2) start page
    All centered:
    h1 element: code quiz challenge
    p element: quiz description
    button: start quiz
        when clicked:
            hide start container
            reveal 1st question container
            initiate timer

3) questions pages
    Left justified in container:
    h2 element: question
    list: answer buttons
        when clicked:
            hide question
            reveal next question/end
            tally score
            adjust timer if incorrect
            p element: display correct or incorrect

4) end page
    Left justified in container:
    h2 element: quiz over message
    p element: display score = time remaining
    input element: enter initials box
    submit button:
        when clicked:
            store initials
            append to high score list
            switch to high score page

5) high schore page
    h2 element: "high scores"
    list element: initials + score
    return to home button
        when clicked:
            reset timer to 0
            return to start page
    clear scores button
        when clicked:
            clear high score list

bonus: multiple question types: true/false and multiple choice */