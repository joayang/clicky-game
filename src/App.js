import React, { Component } from 'react';
import './App.css';
import dogs from './dogs.json'
import Wrapper from './components/Wrapper'
import Navpills from './components/Navpills'
import Title from './components/Title'
import DogCard from './components/DogCard'
// smart or container component can pass the data down to the presentational component as props
class App extends Component {
    state = {
        message: "Click an image to begin!",
        topScore: 0,
        curScore: 0,
        dogs: dogs,
        unselectedDogs: dogs
    }
    //componentDisMount method is called once all element and component instance are mounted
    componentDidMount() {
    }
    // variables i and j swap/shuffle them
    shuffleArray = array => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    selectDog = id => {
        const findDog = this.state.unselectedDogs.find(item => item.id === id);

        if(findDog === undefined) {
            // failure to select a new puppy
            this.setState({ 
                message: "You guessed incorrectly!",
                topScore: (this.state.curScore > this.state.topScore) ? this.state.curScore : this.state.topScore,
                curScore: 0,
                dogs: dogs,
                unselectedDogs: dogs
            });
        }
        else {
            // success to select a new puppy
            const newDogs = this.state.unselectedDogs.filter(item => item.id !== id);
            
            this.setState({ 
                message: "You guessed correctly!",
                curScore: this.state.curScore + 1,
                dogs: dogs,
                unselectedDogs: newDogs
            });
        }

        this.shuffleArray(dogs);
    };

    render() {
        return (
            <Wrapper>
                <Navpills
                    message={this.state.message}
                    curScore={this.state.curScore}
                    topScore={this.state.topScore}
                />
                <Title />
                {
                    this.state.dogs.map(dog => (
                        <DogCard
                            id={dog.id}
                            image={dog.image}
                            selectDog={this.selectDog} 
                            curScore={this.state.curScore}
                        />
                    ))
                }
            </Wrapper>
        );
    }
}

export default App;

