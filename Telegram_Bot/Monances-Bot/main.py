
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
    if not os.path.exists(file_path):
        save_json(file_path, {})
    with open(file_path, 'r') as file:
        return json.load(file)


# Save JSON data
def save_json(file_path, data):
    try:
        os.makedirs(os.path.dirname(file_path), exist_ok=True)
        with open(file_path, 'w') as file:
            json.dump(data, file, ensure_ascii=False, indent=4)
    except IOError as e:
        print(f"Error writing to {file_path}: {e}")


# Start command handler
@bot.message_handler(commands=['start'])
def send_welcome(message):
    markup = types.ReplyKeyboardMarkup(resize_keyboard=True)
    btn1 = types.KeyboardButton("📝 Register")
    btn2 = types.KeyboardButton("🔐 Login")
    markup.add(btn1, btn2)
    bot.send_message(message.chat.id, "Welcome to the bot. Please choose an option:", reply_markup=markup)


# Handle user registration
@bot.message_handler(func=lambda msg: msg.text == "📝 Register")
def register_user(message):
    bot.send_message(message.chat.id, "Please enter your username and password in the format 'username,password'.")
    bot.register_next_step_handler(message, process_registration)


def process_registration(message):
    try:
        username, password = message.text.split(',')
        login_data = load_json(login_data_path)
        if username in login_data:
            bot.send_message(message.chat.id, "Username already exists. Please try logging in.")
        else:
            login_data[username] = password
            save_json(login_data_path, login_data)
            bot.send_message(message.chat.id, "Registration successful. You can now login.")
    except ValueError:
        bot.send_message(message.chat.id, "Invalid format. Please enter the data in the format 'username,password'.")


# Handle user login
@bot.message_handler(func=lambda msg: msg.text == "🔐 Login")
def login_user(message):
    bot.send_message(message.chat.id, "Please enter your username and password in the format 'username,password'.")
    bot.register_next_step_handler(message, process_login)


def process_login(message):
    try:
        username, password = message.text.split(',')
        login_data = load_json(login_data_path)
        if login_data.get(username) == password:
            bot.send_message(message.chat.id, "Login successful.")
            show_main_menu(message)
        else:
            bot.send_message(message.chat.id, "Incorrect username or password.")
    except ValueError:
        bot.send_message(message.chat.id, "Invalid format. Please enter the data in the format 'username,password'.")


# Main menu after login
def show_main_menu(message):
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
@bot.message_handler(
    func=lambda msg: msg.text in ["Incomes", "Expenses", "Weekly Earnings", "Monthly Earnings", "Monthly Expenses",
                                  "Yearly Earnings", "Yearly Expenses"])
def add_financial_data(message):
    category = message.text
    bot.send_message(message.chat.id, f"Enter the amount for {category}.")
    bot.register_next_step_handler(message, process_financial_data, category)


def process_financial_data(message, category):
    try:
        amount = float(message.text)
        financial_data = load_json(financial_data_path)
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
    bot.send_message(message.chat.id,
                     "Enter the accumulation details in the format 'goal,amount_to_collect,amount_saved,currency,photo_url'.")
    bot.register_next_step_handler(message, process_accumulation)


def process_accumulation(message):
    if message.text is None:
        bot.send_message(message.chat.id,
                         "No data received. Please enter the accumulation details in the format 'goal,amount_to_collect,amount_saved,currency,photo_url'.")
        return

    try:
        parts = message.text.split(',')

        if len(parts) != 5:
            raise ValueError(
                "Incorrect number of values. Please enter the data in the format 'goal,amount_to_collect,amount_saved,currency,photo_url'.")

        goal, amount_to_collect, amount_saved, currency, photo_url = parts
        amount_to_collect = float(amount_to_collect)
        amount_saved = float(amount_saved)

        if amount_to_collect < 0 or amount_saved < 0:
            raise ValueError("Amounts must be non-negative.")

        accumulations_data = load_json(accumulations_data_path)
        user_accumulations = accumulations_data.get(str(message.chat.id), [])

        user_accumulations.append({
            'goal': goal,
            'amount_to_collect': amount_to_collect,
            'amount_saved': amount_saved,
            'currency': currency,
            'photo_url': photo_url
        })
        accumulations_data[str(message.chat.id)] = user_accumulations

        save_json(accumulations_data_path, accumulations_data)
        bot.send_message(message.chat.id, f"Accumulation for '{goal}' has been added with the following details:\n"
                                          f"Amount to Collect: {amount_to_collect} {currency}\n"
                                          f"Amount Saved: {amount_saved} {currency}\n"
                                          f"Photo URL: {photo_url}")
    except ValueError as e:
        bot.send_message(message.chat.id,
                         f"Invalid format or value. {e}. Please enter the data in the format 'goal,amount_to_collect,amount_saved,currency,photo_url'.")


# View accumulations handler
@bot.message_handler(func=lambda msg: msg.text == "View Accumulations")
def view_accumulations(message):
    accumulations_data = load_json(accumulations_data_path)
    user_accumulations = accumulations_data.get(str(message.chat.id), [])

    if not user_accumulations:
        bot.send_message(message.chat.id, "No accumulations found.")
        return

    response = "Your accumulations:\n"
    for accumulation in user_accumulations:
        response += (f"Goal: {accumulation['goal']}\n"
                     f"Amount to Collect: {accumulation['amount_to_collect']} {accumulation['currency']}\n"
                     f"Amount Saved: {accumulation['amount_saved']} {accumulation['currency']}\n"
                     f"Photo URL: {accumulation['photo_url']}\n\n")

    bot.send_message(message.chat.id, response)


# Edit accumulation handler (stub for now)
@bot.message_handler(func=lambda msg: msg.text == "Edit Accumulation")
def edit_accumulation(message):
    bot.send_message(message.chat.id, "Edit accumulation functionality is not implemented yet.")


# Delete accumulation handler
@bot.message_handler(func=lambda msg: msg.text == "Delete Accumulation")
def delete_accumulation(message):
    bot.send_message(message.chat.id, "Enter the goal of the accumulation you want to delete.")
    bot.register_next_step_handler(message, process_delete_accumulation)


def process_delete_accumulation(message):
    goal_to_delete = message.text
    accumulations_data = load_json(accumulations_data_path)
    user_accumulations = accumulations_data.get(str(message.chat.id), [])

    updated_accumulations = [accum for accum in user_accumulations if accum['goal'] != goal_to_delete]

    if len(user_accumulations) == len(updated_accumulations):
        bot.send_message(message.chat.id, f"No accumulation found with the goal '{goal_to_delete}'.")
    else:
        accumulations_data[str(message.chat.id)] = updated_accumulations
        save_json(accumulations_data_path, accumulations_data)
        bot.send_message(message.chat.id, f"Accumulation with goal '{goal_to_delete}' has been deleted.")


# Profile settings menu
@bot.message_handler(func=lambda msg: msg.text == "👤 Profile Settings")
def profile_settings(message):
    markup = types.ReplyKeyboardMarkup(resize_keyboard=True)
    btn1 = types.KeyboardButton("Update Profile")
    btn2 = types.KeyboardButton("Change Password")
    btn3 = types.KeyboardButton("Back to Main Menu")
    markup.add(btn1, btn2, btn3)
    bot.send_message(message.chat.id, "Profile Settings menu:", reply_markup=markup)


# Update profile handler
@bot.message_handler(func=lambda msg: msg.text == "Update Profile")
def update_profile(message):
    bot.send_message(message.chat.id, "Please enter your profile details in the format 'name,age,bio,photo_url'.")
    bot.register_next_step_handler(message, process_update_profile)


def process_update_profile(message):
    try:
        parts = message.text.split(',')

        if len(parts) != 4:
            raise ValueError(
                "Incorrect number of values. Please enter the data in the format 'name,age,bio,photo_url'.")

        name, age, bio, photo_url = parts
        age = int(age)

        if age < 0:
            raise ValueError("Age must be non-negative.")

        profile_data = load_json(profile_data_path)
        profile_data[str(message.chat.id)] = {
            'name': name,
            'age': age,
            'bio': bio,
            'photo_url': photo_url
        }
        save_json(profile_data_path, profile_data)
        bot.send_message(message.chat.id, "Profile updated successfully.")
    except ValueError as e:
        bot.send_message(message.chat.id,
                         f"Invalid format or value. {e}. Please enter the data in the format 'name,age,bio,photo_url'.")


# Change password handler
@bot.message_handler(func=lambda msg: msg.text == "Change Password")
def change_password(message):
    bot.send_message(message.chat.id, "Please enter your new password.")
    bot.register_next_step_handler(message, process_change_password)


def process_change_password(message):
    new_password = message.text
    login_data = load_json(login_data_path)

    for username in login_data:
        if str(message.chat.id) == username:
            login_data[username] = new_password
            save_json(login_data_path, login_data)
            bot.send_message(message.chat.id, "Password changed successfully.")
            return

    bot.send_message(message.chat.id, "User not found. Please login first.")


# Reminders menu
@bot.message_handler(func=lambda msg: msg.text == "⏰ Reminders")
def reminders_menu(message):
    markup = types.ReplyKeyboardMarkup(resize_keyboard=True)
    btn1 = types.KeyboardButton("Add Reminder")
    btn2 = types.KeyboardButton("View Reminders")
    btn3 = types.KeyboardButton("Back to Main Menu")
    markup.add(btn1, btn2, btn3)
    bot.send_message(message.chat.id, "Reminders menu:", reply_markup=markup)


# Add reminder handler
@bot.message_handler(func=lambda msg: msg.text == "Add Reminder")
def add_reminder(message):
    bot.send_message(message.chat.id, "Enter your reminder details in the format 'title,date,time'.")
    bot.register_next_step_handler(message, process_add_reminder)


def process_add_reminder(message):
    try:
        title, date, time = message.text.split(',')
        reminder_date = datetime.strptime(date, '%Y-%m-%d').date()
        reminder_time = datetime.strptime(time, '%H:%M').time()

        reminders_data = load_json(reminders_data_path)
        user_reminders = reminders_data.get(str(message.chat.id), [])

        user_reminders.append({
            'title': title,
            'date': reminder_date.isoformat(),
            'time': reminder_time.isoformat()
        })
        reminders_data[str(message.chat.id)] = user_reminders

        save_json(reminders_data_path, reminders_data)
        bot.send_message(message.chat.id, "Reminder added successfully.")
    except ValueError:
        bot.send_message(message.chat.id, "Invalid format. Please enter the data in the format 'title,date,time'.")


# View reminders handler
@bot.message_handler(func=lambda msg: msg.text == "View Reminders")
def view_reminders(message):
    reminders_data = load_json(reminders_data_path)
    user_reminders = reminders_data.get(str(message.chat.id), [])

    if not user_reminders:
        bot.send_message(message.chat.id, "No reminders found.")
        return

    response = "Your reminders:\n"
    for reminder in user_reminders:
        response += (f"Title: {reminder['title']}\n"
                     f"Date: {reminder['date']}\n"
                     f"Time: {reminder['time']}\n\n")

    bot.send_message(message.chat.id, response)


# Logout handler
@bot.message_handler(func=lambda msg: msg.text == "🚪 Logout")
def logout(message):
    bot.send_message(message.chat.id, "You have been logged out.")
    show_main_menu(message)


if __name__ == "__main__":
    bot.polling(none_stop=True)






