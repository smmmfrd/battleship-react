export default function GridSquare({position, handleClick, handleEnter, handleLeave}) {
    return(
        <div id={position} className="w-10 h-10 rounded-sm bg-blue-400" 
        onClick={() => handleClick(position)}
        onMouseEnter={() => handleEnter(position)}
        onMouseLeave={() => handleLeave(position)}/>
    )
}