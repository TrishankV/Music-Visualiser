# Music-Visualiser

## Cymatic Audio Visualizer

The **Cymatic Audio Visualizer** is a web-based tool that visualizes sound patterns created by audio input. Using principles of **cymatics**, it converts audio frequencies into dynamic visualizations, providing an interactive and educational experience. This tool uses the **Web Audio API** for audio analysis and the **p5.js** library for rendering 2D and 3D visual patterns.

## Features

- **Audio Input**: Upload an audio file (MP3, WAV) and visualize its frequencies in real-time.
- **Cymatic Visualization**: View sound wave patterns as 3D spirals or 2D grid-based animations.
- **Waveform View**: Display the raw audio waveform as it plays.
- **Interactivity**: Switch between different visualizer modes and toggle between dark and light themes.
- **Real-Time Rendering**: Visual patterns change dynamically with the audio, reflecting frequency and amplitude.
  
## Technologies Used

- **Web Audio API**: For analyzing and processing the audio input.
- **p5.js**: For drawing interactive 2D and 3D visualizations.
- **HTML5**: For structuring the web page and handling the user interface.
- **CSS**: For styling and theme management.

## How It Works

The visualizer works by capturing the audio input through the Web Audio API, breaking the sound signal into its frequency components using Fast Fourier Transform (FFT). The resulting frequency data is used to create dynamic, ever-changing visual patterns that represent the sound's characteristics. 

### Key Concepts:
- **Cymatics**: The study of visible sound patterns. The visualizer uses sound frequencies to generate complex geometric shapes based on sound wave interference and resonance.
- **Frequency Analysis**: Audio signals are decomposed into frequency bins, and each frequency is visualized through a corresponding pattern.
- **Real-Time Visualization**: As the audio plays, the visual patterns change in real time, responding to the sound's frequency and amplitude.

## How to Use

1. **Upload an Audio File**: Click on the "Choose File" button and select an MP3 or WAV file from your device.
2. **Visualize**: Once the file is uploaded, the audio will automatically start playing, and visual patterns will appear.
3. **Switch Modes**: Toggle between 3D and 2D modes to see different visualizations of the sound.
4. **Control Themes**: Switch between dark and light themes for a different viewing experience.
5. **Adjust Settings**: You can modify settings such as background color, pattern complexity, and more.

## Installation

To run this project locally:

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/cymatic-audio-visualizer.git
    ```

2. Navigate to the project directory:

    ```bash
    cd cymatic-audio-visualizer
    ```

3. Open the `index.html` file in your browser to view the visualizer.

## Example

Here’s what the visualizations look like when a sound is played:

- **Low Frequency Sound**: Larger, slower oscillations.
- **High Frequency Sound**: Tighter, faster patterns.
- **Loud Sound**: Larger and more dramatic patterns.
  
## Contributing

If you'd like to contribute to this project, feel free to fork the repository, make your changes, and create a pull request. Contributions, bug reports, and feature requests are welcome!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **p5.js** for the powerful drawing and animation library.
- **Web Audio API** for providing access to real-time audio analysis.
- The concept of **Cymatics** for inspiring this project.

---

Feel free to reach out if you have any questions or suggestions for the project!
