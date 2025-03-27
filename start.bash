#!/bin/bash

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Change to the script's directory
cd "$SCRIPT_DIR"

# Function to display menu
show_menu() {
    clear
    echo "Playwright Test Script"
    echo "---------------------"
    echo "1. Install Dependencies"
    echo "2. Install Chromium"
    echo "3. Run Tests"
    echo "4. Update Snapshots"
    echo "5. Exit"
    echo
}

# Main script loop
while true; do
    # Display menu
    show_menu

    # Prompt for input and remove whitespace
    read -p "Enter your choice (1-4): " choice
    choice=$(echo "$choice" | tr -d '[:space:]')

    # Execute based on choice
    case "$choice" in
        1)
            echo "Installing dependencies..."
            npm install
            echo
            echo "Dependencies installation complete."
            read -p "Press Enter to continue..."
            ;;
        2)
            echo "Installing Chromium..."
            npx playwright install chromium
            echo
            echo "Chromium installation complete."
            read -p "Press Enter to continue..."
            ;;
        3)
            echo "Running tests..."
            npx playwright test --headed
            echo
            echo "Test run complete."
            read -p "Press Enter to continue..."
            ;;
        4)
            echo "Updating snapshots..."
            npx playwright test --update-snapshots
            echo
            echo "Snapshots update complete."
            read -p "Press Enter to continue..."
            ;;
        5)
            echo "Exiting..."
            exit 0
            ;;
        *)
            echo "Invalid choice, please try again."
            read -p "Press Enter to continue..."
            ;;
    esac
done