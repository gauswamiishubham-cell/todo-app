#!/bin/bash

while true
do
    echo "========================"
    echo " Linux File Manager Menu"
    echo "========================"
    echo "1. Open Folder"
    echo "2. Create File"
    echo "3. Create Folder"
    echo "4. Delete File"
    echo "5. List Files"
    echo "6. Exit"
    echo "========================"

    read -p "Enter your choice: " choice

    case $choice in
        1)
            read -p "Enter folder path: " folder
            cd "$folder" 2>/dev/null && pwd || echo "Folder not found!"
            ;;
        2)
            read -p "Enter file name: " filename
            touch "$filename"
            echo "File created: $filename"
            ;;
        3)
            read -p "Enter folder name: " dirname
            mkdir -p "$dirname"
            echo "Folder created: $dirname"
            ;;
        4)
            read -p "Enter file name to delete: " filename
            rm -f "$filename"
            echo "File deleted: $filename"
            ;;
        5)
            ls -lah
            ;;
        6)
            echo "Goodbye!"
            exit 0
            ;;
        *)
            echo "Invalid choice!"
            ;;
    esac

    echo ""
    read -p "Press Enter to continue..."
    clear
done

