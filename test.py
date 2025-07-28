import ollama
import time

test_prompt = '''
I'm trying to plan a trip to travel to Japan bui failed to book the last room in the Tokyo hotel because they ran out of room. Where should I stayed in Tokyo if I want a mid-range price hotel with good night view.
'''


user_prompt = f"""
You are an expert search‑query engineer. Your job is to read the input text and generate a concise list of clear, well‑formed questions that someone could paste directly into a search engine to find relevant data.

Instructions:
1/ Identify the key topics, entities, dates, and metrics mentioned in the text.
2/ For each, write a standalone question that starts with “What,” “When,” “How,” or “Who” and would retrieve the most relevant results.
3/ Keep each question short (under 15 words) and remove any unnecessary fluff.
4/ The maximum number of question is 5.
5/ Output your questions as a numbered list and nothing else.

Input Text:
{input('---:')}

Output (example):
1/ What is the latest annual revenue of Company X?
2/ How many units did Product Y sell in Q1 2025?
3/ When did Event Z first occur?
"""


def parser():

    start = time.time()
    response = ollama.generate(
        model='llama3.2:1b',
        prompt=user_prompt,
        # stream=True
    )
    end = time.time()
    print(response['response'])
    print('-'*50)
    print(f'Time = {end-start}')

    # The code below is for stream = True
    # for chunk in response:
    #     print(chunk['response'], end='', flush=True)
    # print()

parser()
git config --global user.email "you@example.com"
git config --global user.name "Your Name"