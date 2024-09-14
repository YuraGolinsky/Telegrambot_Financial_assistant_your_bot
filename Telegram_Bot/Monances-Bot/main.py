import telebot
import json
import os
from telebot import types
from datetime import datetime

# Telegram Bot Token
bot = telebot.TeleBot('')

# Paths to JSON files
login_data_path = r'C:\xampp\htdocs\Monances-main\LoginRegistration.json'
accumulations_data_path = r'C:\xampp\htdocs\Monances-main\pages\Accumulations\accumulations.json'
profile_data_path = r'C:\xampp\htdocs\Monances-main\pages\Profile\profile.json'
financial_data_path = r'C:\xampp\htdocs\Monances-main\pages\Dashboard\card_data.json'
reminders_data_path = r'C:\xampp\htdocs\Monances-main\pages\Reminders\reminders.json'

# Load JSON data
def load_json(file_path):
    # If file does not exist, create it with an empty dictionary
    if not os.path.exists(file_path):
        save_json(file_path, {})
    # Open the JSON file and return the data
    with open(file_path, 'r') as file:
        return json.load(file)

# Save JSON data
def save_json(file_path, data):
    try:
        # Ensure directories exist
        os.makedirs(os.path.dirname(file_path), exist_ok=True)
        # Write the data to the JSON file
        with open(file_path, 'w') as file:
            json.dump(data, file, ensure_ascii=False, indent=4)
    except IOError as e:
        print(f"Error writing to {file_path}: {e}")

# Start command handler
@bot.message_handler(commands=['start'])
def send_welcome(message):
    # Create buttons for registration and login
    markup = types.ReplyKeyboardMarkup(resize_keyboard=True)
    btn1 = types.KeyboardButton("📝 Register")
    btn2 = types.KeyboardButton("🔐 Login")
    markup.add(btn1, btn2)
    bot.send_message(message.chat.id, "Welcome to the bot. Please choose an option:", reply_markup=markup)

# Handle user registration
@bot.message_handler(func=lambda msg: msg.text == "📝 Register")
def register_user(message):
    # Ask the user to enter username and password
    bot.send_message(message.chat.id, "Please enter your username and password in the format 'username,password'.")
    bot.register_next_step_handler(message, process_registration)

def process_registration(message):
    try:
        # Split the username and password from the input
        username, password = message.text.split(',')
        login_data = load_json(login_data_path)
        # Check if the username already exists
        if username in login_data:
            bot.send_message(message.chat.id, "Username already exists. Please try logging in.")
        else:
            # Save the new username and password
            login_data[username] = password
            save_json(login_data_path, login_data)
            bot.send_message(message.chat.id, "Registration successful. You can now login.")
    except ValueError:
        bot.send_message(message.chat.id, "Invalid format. Please enter the data in the format 'username,password'.")

# Handle user login
@bot.message_handler(func=lambda msg: msg.text == "🔐 Login")
def login_user(message):
    # Ask the user to enter username and password
    bot.send_message(message.chat.id, "Please enter your username and password in the format 'username,password'.")
    bot.register_next_step_handler(message, process_login)

def process_login(message):
    try:
        # Split the username and password from the input
        username, password = message.text.split(',')
        login_data = load_json(login_data_path)
        # Check if the username and password match
        if login_data.get(username) == password:
            bot.send_message(message.chat.id, "Login successful.")
            show_main_menu(message)
        else:
            bot.send_message(message.chat.id, "Incorrect username or password.")
    except ValueError:
        bot.send_message(message.chat.id, "Invalid format. Please enter the data in the format 'username,password'.")

# Main menu after login
def show_main_menu(message):
    # Create buttons for different sections of the app
    markup = types.ReplyKeyboardMarkup(resize_keyboard=True)
    btn1 = types.KeyboardButton("💵 Financial Resources")
    btn2 = types.KeyboardButton("💰 Financial Accumulations")
    btn3 = types.KeyboardButton("👤 Profile Settings")
    btn4 = types.KeyboardButton("⏰ Reminders")
    btn5 = types.KeyboardButton("🚪 Logout")
    markup.add(btn1, btn2, btn3, btn4, btn5)
    bot.send_message(message.chat.id, "Welcome to the main menu. Please choose an option:", reply_markup=markup)

# Financial Resources menu
@bot.message_handler(func=lambda msg: msg.text == "💵 Financial Resources")
def financial_resources(message):
    # Create buttons for financial options like incomes, expenses, and earnings
    markup = types.ReplyKeyboardMarkup(resize_keyboard=True)
    btn1 = types.KeyboardButton("Incomes")
    btn2 = types.KeyboardButton("Expenses")
    btn3 = types.KeyboardButton("Total")
    btn4 = types.KeyboardButton("Weekly Earnings")
    btn5 = types.KeyboardButton("Monthly Earnings")
    btn6 = types.KeyboardButton("Monthly Expenses")
    btn7 = types.KeyboardButton("Yearly Earnings")
    btn8 = types.KeyboardButton("Yearly Expenses")
    btn9 = types.KeyboardButton("Save Financial Data")
    btn10 = types.KeyboardButton("View Financial Data")
    btn11 = types.KeyboardButton("Back to Main Menu")
    markup.add(btn1, btn2, btn3, btn4, btn5, btn6, btn7, btn8, btn9, btn10, btn11)
    bot.send_message(message.chat.id, "Financial Resources menu:", reply_markup=markup)

# Handle adding financial data
@bot.message_handler(func=lambda msg: msg.text in ["Incomes", "Expenses", "Weekly Earnings", "Monthly Earnings", "Monthly Expenses",
                                                  "Yearly Earnings", "Yearly Expenses"])
def add_financial_data(message):
    category = message.text
    # Ask user to input the amount for the selected category
    bot.send_message(message.chat.id, f"Enter the amount for {category}.")
    bot.register_next_step_handler(message, process_financial_data, category)

def process_financial_data(message, category):
    try:
        # Convert the input to a floating-point number
        amount = float(message.text)
        financial_data = load_json(financial_data_path)
        # Save the amount under the appropriate category
        user_data = financial_data.get(str(message.chat.id), {})
        user_data[category] = amount
        financial_data[str(message.chat.id)] = user_data
        save_json(financial_data_path, financial_data)
        bot.send_message(message.chat.id, f"{category} updated. Current amount: {amount}")
    except ValueError:
        bot.send_message(message.chat.id, "Invalid amount. Please enter a valid number.")

# Handle calculating the total
@bot.message_handler(func=lambda msg: msg.text == "Total")
def calculate_total(message):
    # Calculate the total based on incomes and expenses
    financial_data = load_json(financial_data_path)
    user_data = financial_data.get(str(message.chat.id), {})
    total = user_data.get('Incomes', 0) - user_data.get('Expenses', 0)
    bot.send_message(message.chat.id, f"Total: {total}")

# Save financial data (stub for now)
@bot.message_handler(func=lambda msg: msg.text == "Save Financial Data")
def save_financial_data(message):
    bot.send_message(message.chat.id, "Financial data saved.")

# View financial data
@bot.message_handler(func=lambda msg: msg.text == "View Financial Data")
def view_financial_data(message):
    # Retrieve and display financial data for the user
    financial_data = load_json(financial_data_path)
    user_data = financial_data.get(str(message.chat.id), {})
    response = (
        f"Incomes: {user_data.get('Incomes', 0)}\n"
        f"Expenses: {user_data.get('Expenses', 0)}\n"
        f"Total: {user_data.get('Incomes', 0) - user_data.get('Expenses', 0)}\n\n"
        f"Weekly Earnings: {user_data.get('Weekly Earnings', 0)}\n"
        f"Monthly Earnings: {user_data.get('Monthly Earnings', 0)}\n"
        f"Yearly Earnings: {user_data.get('Yearly Earnings', 0)}\n"
        f"Yearly Expenses: {user_data.get('Yearly Expenses', 0)}\n"
    )
    bot.send_message(message.chat.id, response)

# Go back to the main menu
@bot.message_handler(func=lambda msg: msg.text == "Back to Main Menu")
def back_to_main_menu(message):
    show_main_menu(message)

# Financial Accumulations menu
@bot.message_handler(func=lambda msg: msg.text == "💰 Financial Accumulations")
def financial_accumulations(message):
    # Create buttons for accumulation options
    markup = types.ReplyKeyboardMarkup(resize_keyboard=True)
    btn1 = types.KeyboardButton("Add Accumulation")
    btn2 = types.KeyboardButton("View Accumulations")
    btn3 = types.KeyboardButton("Edit Accumulation")
    btn4 = types.KeyboardButton("Delete Accumulation")
    btn5 = types.KeyboardButton("Back to Main Menu")
    markup.add(btn1, btn2, btn3, btn4, btn5)
    bot.send_message(message.chat.id, "Financial Accumulations menu:", reply_markup=markup)

# Add accumulation handler
@bot.message_handler(func=lambda msg: msg.text == "Add Accumulation")
def add_accumulation(message):
    bot.send_message(message.chat.id, "Enter the accumulation details in the format 'goal,amount'.")
    bot.register_next_step_handler(message, process_accumulation)

def process_accumulation(message):
    try:
        # Split the input into goal and amount
        goal, amount = message.text.split(',')
        amount = float(amount)
        accumulations_data = load_json(accumulations_data_path)
        # Get user data or create new if it doesn't exist
        user_accumulations = accumulations_data.get(str(message.chat.id), [])
        # Append new accumulation
        user_accumulations.append({'goal': goal, 'amount': amount})
        accumulations_data[str(message.chat.id)] = user_accumulations
        save_json(accumulations_data_path, accumulations_data)
        bot.send_message(message.chat.id, f"Accumulation for '{goal}' of amount {amount} has been added.")
    except ValueError:
        bot.send_message(message.chat.id, "Invalid format. Please enter the data in the format 'goal,amount'.")

# View accumulations handler
@bot.message_handler(func=lambda msg: msg.text == "View Accumulations")
def view_accumulations(message):
    accumulations_data = load_json(accumulations_data_path)
    user_accumulations = accumulations_data.get(str(message.chat.id), [])
    # Display all accumulations for the user
    if user_accumulations:
        response = "\n".join([f"{i+1}. Goal: {acc['goal']}, Amount: {acc['amount']}" for i, acc in enumerate(user_accumulations)])
        bot.send_message(message.chat.id, response)
    else:
        bot.send_message(message.chat.id, "You have no accumulations yet.")

# Edit accumulation (To be implemented)
# Delete accumulation (To be implemented)

# Run the bot

if __name__ == "__main__":
    bot.polling(none_stop=True)






