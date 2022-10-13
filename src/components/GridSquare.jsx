export default function GridSquare({position, handleClick, handleEnter, handleLeave}) {
    return(
        <div id={position} className="w-8 h-8 rounded-xl bg-blue-400" 
        onClick={() => handleClick(position)}
        onMouseEnter={() => handleEnter(position)}
        onMouseLeave={() => handleLeave(position)}/>
    )
}