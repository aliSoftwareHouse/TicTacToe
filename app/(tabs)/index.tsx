import { View, Text, Pressable } from 'react-native';
import React, { useState } from 'react';
import className from 'twrnc';

const Square = ({ value, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <Text style={className`border py-5 text-7xl h-30 w-30 text-center justify-center`}>
        {value}
      </Text>
    </Pressable>
  );
};

const Index = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const handlePress = (index) => {
    if (squares[index] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[index] = isXNext ? 'X' : 'O';
    setSquares(nextSquares);
    setIsXNext(!isXNext);
  };

  const renderSquare = (index) => {
    return (
      <Square 
        value={squares[index]} 
        onPress={() => handlePress(index)} 
      />
    );
  };

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${isXNext ? 'X' : 'O'}`;
  }

  return (
    <View style={className`p-5 gap-3`}>
      <Text style={className`text-3xl`}>Tic Tac Toe App</Text>
      <Text style={className`text-xl`}>{status}</Text>
      <View>
        <View style={className`flex-row`}>
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </View>
        <View style={className`flex-row`}>
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </View>
        <View style={className`flex-row`}>
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </View>
      </View>
    </View>
  );
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
};

export default Index;
