# Reinforcement Neural Network

This project is a continuation of my supervised neural network.

In May 2019 I attended a lecture on machine learning by Prof V Kanade and was inspired to adapt my supervised neural network algorithm to the reinforcement learning model. I decided to utilise a simple arcade game that I had designed some time ago, called ‘Flag Run’, in order to train the network and develop its intelligence. An important stage in this process involved re-writing the reward function of my supervised learning algorithm, such that data feeding into the back propagation would be dependant upon the immediate surroundings of the game player.

Currently the AI performs well initially but then its performance deteriorates: once it has learned to travel in a particular direction, it tends to travel that way more frequently - reinforcing its knowledge of moving in that direction and creating a further bias for that direction…

My next major goal for this project is to solve this issue so that it continues to learn positively, without any single direction being overwhelmingly reinforced.
