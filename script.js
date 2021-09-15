let _notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
let _notes_alias = ["-", "Db", "-", "Eb", "-", "-", "Gb", "-", "Ab", "-", "Bb", "-"]


let _major_scale_notes = [0,2,4,5,7,9,11]
let _major_scale_chords = ['M', 'm', 'm', 'M', 'M', 'm', 'dim']

let _minor_harmonic_scale_notes = [0,2,3,5,7,8,11]
let _minor_harmonic_scale_chords = ['m', 'dim', 'aug', 'm', 'M', 'M', 'dim']

let _triad_chord = [0,2,4]


function get_scale_notes(base_note, type)
{
    let notes = []
    let base_note_index = _notes.indexOf(base_note)

    for (var i = 0; i < 8; i++)
    {
        if (type == "major")
        {
            notes.push(_notes[(base_note_index + _major_scale_notes[i%7])%12])
        }
        else if (type == "minor")
        {
            notes.push(_notes[(base_note_index + _minor_harmonic_scale_notes[i%7])%12])

        }
    }
    return notes
}

function get_relative_minor_scale(base_note)
{
    let base_note_index = _notes.indexOf(base_note)
    let rel_minor_index = (base_note_index + _major_scale_notes[5]) % 12
    return _notes[rel_minor_index] + " minor"
}

function get_relative_major_scale(base_note)
{
    let base_note_index = _notes.indexOf(base_note)
    let rel_major_index = (base_note_index + _minor_harmonic_scale_notes[2]) % 12
    return _notes[rel_major_index] + " Major"
}

function get_chords(base_note, type)
{
    let chords = []
    let base_note_index = _notes.indexOf(base_note)

    for (var i = 0; i < 7; i++)
    {
        let chord_type = ''
        let chord_notes = []
        let current_note = ''
        if (type == "minor")
        {
            chord_type = _minor_harmonic_scale_chords[i]
            current_note = _notes[(base_note_index+_minor_harmonic_scale_notes[i])%12]
            
            for (var j = 0; j < 3; j++)
            {
                chord_notes.push( _notes[(base_note_index + _minor_harmonic_scale_notes[(i + _triad_chord[j]) % 7]) % 12] )
            }

        }
        else if (type == "major")
        {
            chord_type = _major_scale_chords[i]
            current_note = _notes[(base_note_index+_major_scale_notes[i])%12]
            for (var j = 0; j < 3; j++)
            {
                chord_notes.push( _notes[(base_note_index + _major_scale_notes[(i + _triad_chord[j]) % 7]) % 12] )
            }
        }
        

        let chord_name = current_note + chord_type
        chords.push({[chord_name]: chord_notes})
    }

    return chords
}

function get_aliases(notes)
{
    let aliases = []
    for (var i=0; i<8; i++)
    {
        if (_notes_alias[_notes.indexOf(notes[i])] != "-")
        {
            aliases.push(_notes_alias[_notes.indexOf(notes[i%7])])
        }
        else
        {
            aliases.push(notes[i%7])
        }
    }
    return aliases
}


function get_dominant_of_dominant(base_note, type)
{
    console.log(base_note + ", " + type)
    let s = get_scale_notes(base_note, type)
    let d_index = _notes.indexOf(s[4])
    let d_s = get_chords(_notes[d_index], "major")[4]
    console.log(d_index)
    return Object.keys(get_chords(_notes[d_index], "major")[4]);
}