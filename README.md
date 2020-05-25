|- App (state of current user w/all their stuff)
    |- Login/Signup
    |-NavBar
        |-Store (item container)
            |-items
        |-Battlefield (left to right) (current HP PATCH or STATE?)
            |- Opponents 
                |-BattleGundam 
            |- UserGundams
                |-BattleGundam
        |-ProfilePage (PATCH to attach items to gundams)
            |-UserGundams
                |-ProfileGundam
            |- Inventory
                |-Item

            
Next Steps 
- battlefield logic state of selected gundam, opponent gundam, state of each gundams health
*background

    - select gundam for battle component 
    if either gundam health state reached 0 you win or lose 

    - battlefield component (state for whos turn it is)
        - battlefield gundam (like a profile gundam but diff format)
            div for attack, one special attack in state true or false (can maybe recharge?)
        - enemy gundam
            logic attack (if attack state is "opponent" then attack)
             - needs an interval before attacking
             
        



