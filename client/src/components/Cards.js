
import { Button, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const Cards =(props)=>{
    
   
    const history = useHistory();

    const onClickViewMovie = (id) => {
        history.push(`/${id}`);
    }

  //  console.log(props.movie.id);
   // console.log(props.movie.title);

 return (
    <Card key={props.movie.id} className="m-3 movie-card">
    <Card.Body>
        <Card.Title>{props.movie.title}</Card.Title>
        <Card.Text>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        </Card.Text>
        <Button
            variant="success"
            onClick={() => onClickViewMovie(props.movie.id)}>
            View Movie
        </Button>
    </Card.Body>
</Card>
 )
}

export default Cards;