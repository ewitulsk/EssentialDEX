#Decentralized Exchange (DEX) on Essential Blockchain

Welcome to our project! This repository contains the code for the first decentralized exchange (DEX) built on the Essential Blockchain, a groundbreaking platform utilizing a declarative programming model. Essential’s unique architecture allows state updates driven by constraints and solvers, optimizing outcomes without requiring traditional direct transaction execution.
##Project Overview
###What We Built

    Decentralized Exchange (DEX): Our DEX allows users to:
        Add/remove liquidity using token pairs and receive LP tokens, representing their share of the liquidity pool.
        Swap tokens within the liquidity pools, with prices adjusted automatically based on the AMM (Automated Market Maker) model.
        Earn LP tokens for providing liquidity and share in transaction fees as passive income.

###Key Features:

    Token Management: Since there were no tokens available on Essential Blockchain when we started, we wrote contracts to mint, burn, and transfer tokens.
    Smart Wallet Integration: We experimented with building a smart wallet tailored for the Essential Blockchain, ensuring seamless interaction between contracts and users.
    Next.js & React Frontend: The frontend is built using Next.js and React, providing a modern and responsive user experience, following best practices seen in other swap protocols.

###Development Timeline

Despite the tight 36-hour build timeframe, we successfully created the core DEX functionality and see immense potential for future development.
The TypeScript Framework for Essential Blockchain

A major portion of our work involved creating and open-sourcing a TypeScript framework for Essential Blockchain. Since no existing framework was available, we developed this tool to allow other developers to easily build applications on Essential using JavaScript/TypeScript, significantly lowering the barrier to entry for developers looking to leverage the Essential ecosystem.
Testing Framework

To ensure the reliability of our contracts, we developed a comprehensive testing framework. This allowed us to thoroughly test the declarative contract syntax and interact directly with the Essential team in Australia to troubleshoot and optimize as needed.
Future Enhancements

We have a number of exciting plans for the future, including:

    Dollar-Cost Averaging (DCA) Tool: This feature will allow users to automatically purchase assets on a scheduled basis, leveraging time-based constraints in Pint contracts.
    Expanded Features and Token Support: Continued exploration of the Essential Blockchain’s unique features to unlock new innovations in decentralized finance.

##Getting Started

To run the project locally:

    Clone the repo.
    Install dependencies using npm install.
    Start the local development server with npm run dev.
